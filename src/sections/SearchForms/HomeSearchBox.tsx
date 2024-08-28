import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { _propertyTypes } from "./_data";
import { propertySearchSchema } from "./formSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import axios from "axios";
import useLocalStorage from "@/src/hooks/useLocalstorage";
import AutocompleteComponent from "./AutocompleteComponent";
import MobileFilter from "../filter/mobileFilter";

export function HomeSearchBox({hideFilter}: {hideFilter?: boolean}) {
  const form = useForm<yup.InferType<typeof propertySearchSchema>>({
    resolver: yupResolver(propertySearchSchema),
    defaultValues: {
    //   location: "",
      minPrice: 'no min',
      maxPrice: 'no max',
      propertyType: "All type",
      bedrooms: 'any',
    //   furnished: false,
    },
  });
  const [location, setLocation] = useLocalStorage('location', {})
  const _priceList = generatePriceList();


  function onSubmit(data: yup.InferType<typeof propertySearchSchema>) {
    console.log(data);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid  md:grid-cols-4 bg-theme-dark w-full max-w-[93%] md:max-w-7xl rounded-2xl p-6 mx-auto gap-4">
          
          <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="text-xs bg-background">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="text-xs">
                        <SelectGroup>
                          {_propertyTypes.map((type, index) => (
                            <SelectItem key={index} className="text-xs capitalize" value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AutocompleteComponent setLocation={setLocation} />

            <div className="w-full grid grid-cols-2 gap-2 md:gap-4 items-center">
              <FormField
                  control={form.control}
                  name="minPrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="text-xs bg-background">
                            <SelectValue placeholder="Min Price" />
                          </SelectTrigger>
                          <SelectContent className="text-xs">
                            <SelectGroup>
                            <SelectItem className="text-xs capitalize" value="no min">no min</SelectItem>
                              {_priceList.map((price, index) => (
                                <SelectItem key={index} className="text-xs capitalize" value={price.value.toString()}>
                                  {price.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="text-xs bg-background">
                          <SelectValue placeholder="Max Price" />
                        </SelectTrigger>
                        <SelectContent className="text-xs">
                          <SelectGroup>
                          <SelectItem className="text-xs capitalize" value="no max">no max</SelectItem>
                            {_priceList.map((price, index) => (
                              <SelectItem key={index} className="text-xs capitalize" value={price.value.toString()}>
                                {price.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex items-center gap-2">
                <Button className="w-full h-12">Search</Button>
                { !hideFilter && <MobileFilter />}
            </div>
        </form>
      </Form>
  );
}

const generatePriceList = (): { value: number, label: string }[] => {
  const prices: { value: number, label: string }[] = [];

  const addPrice = (price: number, label: string) => {
    prices.push({ value: price, label: `₦ ${label}` });
  };

  // Add specific ranges
  const ranges = [
    { max: 1000000, step: 100000 },   // 100,000 to 1 Million
    { max: 10000000, step: 1000000 }, // 1 Million to 10 Million
    { max: 100000000, step: 10000000 }, // 10 Million to 100 Million
    { max: 300000000, step: 50000000 }  // 100 Million to 300 Million
  ];

  // Populate price options
  ranges.forEach(({ max, step }) => {
    for (let price = prices.length === 0 ? 100000 : prices[prices.length - 1].value + step; price <= max; price += step) {
      const formattedPrice = price >= 1000000
        ? `${(price / 1000000).toLocaleString()} Million`
        : `${price.toLocaleString()}`;
      addPrice(price, formattedPrice);
    }
  });

  return prices;
};
