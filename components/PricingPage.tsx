import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";
import { PricingPlan, pricingPlan } from "@/data/pricingplan";

import { Badge } from "./ui/badge";

const PricingPage = () => {
  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="font-extrabold text-3xl mb-2">Plan and Pricing</h1>
        <p className="text-muted-foreground">
          Receive unlimited credits when you pay early, and save your plan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlan.map((plan: PricingPlan, index: number) => (
          <Card
            className={` ${
              plan.level === "Enterprise" ? "bg-[#1c1c1c] text-white dark:bg-white dark:text-black" : null
            } w-[350px] flex flex-col justify-between`}
            key={index}
          >
            <CardHeader className="flex gap-2 flex-row items-center">
              <CardTitle>{plan.level}</CardTitle>
              {plan.level === "Pro" && (
                <Badge className="rounded-full bg-orange-600 hover:bg-none">
                  🔥 Popular
                </Badge>
              )}
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-2xl font-bold">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.services.map((item: string, index: number) => (
                  <li className="flex items-center" key={index}>
                    <span className="text-green-500 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className={`${
                  plan.level === "Enterprise" ? "text-black" : "" 
                } w-full dark:text-white`}
              >
                Get started with {plan.level}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
