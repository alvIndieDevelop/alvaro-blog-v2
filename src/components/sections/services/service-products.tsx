"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog";
import { Check, Code2, Database, Globe, Server } from "lucide-react";
// import { loadStripe } from "@stripe/stripe-js";
// import { useToast } from "@/hooks/use-toast";

// // Only initialize Stripe if the key is available
// const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
//   ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
//   : null;

const products = [
  {
    id: "express-api",
    name: "Express.js API Starter",
    description:
      "Complete REST API with authentication and database integration",
    icon: Server,
    basePrice: 100,
    tiers: [
      {
        name: "Basic",
        price: 100,
        features: [
          "Basic CRUD operations",
          "User authentication",
          "MongoDB integration",
          "API documentation",
          "Basic error handling",
          "Environment setup",
        ],
      },
      {
        name: "Professional",
        price: 150,
        features: [
          "Everything in Basic",
          "Role-based access control",
          "File upload",
          "Email integration",
          "Request validation",
          "Rate limiting",
          "Swagger documentation",
        ],
      },
      {
        name: "Enterprise",
        price: 300,
        features: [
          "Everything in Professional",
          "Multiple database support",
          "Caching layer",
          "Websockets integration",
          "Advanced security features",
          "Docker configuration",
          "CI/CD setup",
          "3 months support",
        ],
      },
    ],
  },
  {
    id: "blog-cms",
    name: "Blog with Headless CMS",
    description: "Modern blog platform with content management system",
    icon: Globe,
    basePrice: 80,
    tiers: [
      {
        name: "Starter",
        price: 80,
        features: [
          "Next.js frontend",
          "Basic CMS integration",
          "Responsive design",
          "SEO optimization",
          "Basic analytics",
          "Contact form",
        ],
      },
      {
        name: "Business",
        price: 100,
        features: [
          "Everything in Starter",
          "Custom design",
          "Newsletter integration",
          "Social media sharing",
          "Comment system",
          "Search functionality",
          "Content scheduling",
        ],
      },
      {
        name: "Premium",
        price: 200,
        features: [
          "Everything in Business",
          "Multi-language support",
          "E-commerce integration",
          "Member-only content",
          "Advanced analytics",
          "Custom integrations",
          "Performance optimization",
          "6 months support",
        ],
      },
    ],
  },
  {
    id: "fullstack-saas",
    name: "Full-Stack SaaS Template",
    description: "Complete SaaS starter with authentication and payments",
    icon: Database,
    basePrice: 200,
    tiers: [
      {
        name: "Basic",
        price: 200,
        features: [
          "User authentication",
          "Dashboard interface",
          "Basic subscription",
          "Profile management",
          "Email notifications",
          "Basic analytics",
        ],
      },
      {
        name: "Advanced",
        price: 300,
        features: [
          "Everything in Basic",
          "Team management",
          "Advanced permissions",
          "API access",
          "Webhook integration",
          "Usage tracking",
          "Custom branding",
        ],
      },
      {
        name: "Enterprise",
        price: 500,
        features: [
          "Everything in Advanced",
          "White-label solution",
          "Priority support",
          "Custom features",
          "Migration assistance",
          "Security audit",
          "Performance optimization",
          "1 year support",
        ],
      },
    ],
  },
];

interface TierDialogProps {
  product: (typeof products)[0];
  isOpen: boolean;
  onClose: () => void;
}

function TierDialog({ product, isOpen, onClose }: TierDialogProps) {
  //   const handlePurchase = async (tier: (typeof product.tiers)[0]) => {
  //     try {
  //       const response = await fetch("/api/create-checkout-session", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           productId: product.id,
  //           tierName: tier.name,
  //           price: tier.price,
  //         }),
  //       });

  //       const { sessionId } = await response.json();
  //       const stripe = await stripePromise;
  //       await stripe?.redirectToCheckout({ sessionId });
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {product.name} - Pricing Tiers
          </DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {product.tiers.map((tier, index) => (
            <Card key={tier.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground"> one-time</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {/* <Button className="w-full" onClick={() => handlePurchase(tier)}>
                  Purchase
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ServiceProducts() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready-to-Use Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jump-start your project with our pre-built solutions and templates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex flex-col h-full hover:border-primary/30 transition-all duration-200">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <product.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">
                      From ${product.basePrice}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {product.tiers.map((tier) => (
                      <Badge
                        key={tier.name}
                        variant="secondary"
                        className="mr-2"
                      >
                        {tier.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => setSelectedProduct(product)}
                  >
                    View Pricing
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <TierDialog
          product={selectedProduct}
          isOpen={true}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
