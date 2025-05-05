import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const stripePayment = async (req, res) => {
  const origin = req.headers.origin;
  try {
    const { cart, totalPrice } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty or invalid" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image], // images يجب أن تكون مصفوفة وليست مفردة!
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
};
