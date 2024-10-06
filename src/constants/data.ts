import { HOODIE_BLACK, HOODIE_BLUE, HOODIE_GREEN, HOODIE_RED, HOODIE_WHITE, SHIRT_BLUE, SHIRT_GREEN, SHIRT_GREY, SHIRT_ORANGE, SHIRT_YELLOW, TSHIRT_BLACK, TSHIRT_BLUE, TSHIRT_MAROON, TSHIRT_RED, TSHIRT_WHITE } from "./images";

export interface productListingDummyDataTypes {
    image: string,
    name: string,
    type: string,
    size: string,
    color: string,
    inStock: boolean,
    price: number,
    qty?: number,
    id: string, 
}

export const productListingDummyData: productListingDummyDataTypes[] = [
    {
      image: HOODIE_BLACK,
      name: "Classic Hoodie",
      type: "hoodie",
      size: "large",
      color: "black",
      inStock: true,
      price: 29.99,
      id: "hoodieblack"
    },
    {
      image: TSHIRT_BLACK,
      name: "Graphic T-Shirt",
      type: "t-shirt",
      size: "medium",
      color: "black",
      inStock: true,
      price: 19.99,
      id:"tshirtblack"
    },
    {
      image: SHIRT_BLUE,
      name: "Casual Shirt",
      type: "shirt",
      size: "small",
      color: "blue",
      inStock: false,
      price: 24.99,
      id: "shirtblue"
    },
    {
      image: HOODIE_BLUE,
      name: "Zip-Up Hoodie",
      type: "hoodie",
      size: "medium",
      color: "blue",
      inStock: true,
      price: 34.99,
      id: "hoodieblue"
    },
    {
      image: TSHIRT_BLUE,
      name: "V-Neck T-Shirt",
      type: "t-shirt",
      size: "large",
      color: "blue",
      inStock: true,
      price: 17.99,
      id:"tshirtblue"
    },
    {
      image: SHIRT_GREEN,
      name: "Slim Fit Shirt",
      type: "shirt",
      size: "large",
      color: "green",
      inStock: true,
      price: 27.99,
      id:"shirtgreen"
    },
    {
      image: HOODIE_GREEN,
      name: "Fleece Hoodie",
      type: "hoodie",
      size: "small",
      color: "green",
      inStock: false,
      price: 32.99,
      id:"hoodiegreen"
    },
    {
      image: TSHIRT_MAROON,
      name: "Pocket T-Shirt",
      type: "t-shirt",
      size: "small",
      color: "maroon",
      inStock: true,
      price: 15.99,
      id:"tshirtmaroon"
    },
    {
      image: SHIRT_GREY,
      name: "Linen Shirt",
      type: "shirt",
      size: "medium",
      color: "grey",
      inStock: false,
      price: 29.99,
      id:"shirtgrey"
    },
    {
      image: HOODIE_RED,
      name: "Pullover Hoodie",
      type: "hoodie",
      size: "large",
      color: "red",
      inStock: true,
      price: 39.99,
      id:"hoodiered"
    },
    {
      image: TSHIRT_RED,
      name: "Crew Neck T-Shirt",
      type: "t-shirt",
      size: "medium",
      color: "red",
      inStock: true,
      price: 16.99,
      id:"tshirtred"
    },
    {
      image: SHIRT_ORANGE,
      name: "Flannel Shirt",
      type: "shirt",
      size: "large",
      color: "orange",
      inStock: true,
      price: 31.99,
      id:"shirtorange"
    },
    {
      image: HOODIE_WHITE,
      name: "Cropped Hoodie",
      type: "hoodie",
      size: "medium",
      color: "white",
      inStock: false,
      price: 35.99,
      id:"hoodiewhite"
    },

    {
      image: TSHIRT_WHITE,
      name: "Printed T-Shirt",
      type: "t-shirt",
      size: "small",
      color: "white",
      inStock: true,
      price: 18.99,
      id:"tshirtwhite"
    },
    {
      image: SHIRT_YELLOW,
      name: "Denim Shirt",
      type: "shirt",
      size: "medium",
      color: "yellow",
      inStock: false,
      price: 36.99,
      id:"shirtyellow"
    }
  ];
  
  export const productType: string[]  = [
    "hoodie",
    "shirt",
    "t-shirt"
  ]

  export const productSize: string[]  = [
    "small",
    "medium",
    "large"
  ]