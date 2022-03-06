import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { Container, Grid, Row, Button } from "@nextui-org/react";
import ProductCard from "components/Products/ProductCard/ProductCard";

import { useDispatch } from "react-redux";

import { addToCart } from "slices/cart.slice";

export default function Home() {
  const dispatch = useDispatch();

  const handleAddToCard = useCallback(
    (item) => {
      dispatch(addToCart(item));
    },
    [dispatch]
  );
  const stock = useSelector((state) => state.stock.products);
  const cart = useSelector((state) => state.cart) || [];
  const router = useRouter();
  return (
    <Container>
      <Grid.Container>
        <Row justify="flex-end">
          <Button
            onClick={() => router.push("/cart")}
            css={{ mb: "$8", "@xsMax": { w: "100%" } }}
          >
            Go To Cart ({cart.length})
          </Button>
        </Row>
      </Grid.Container>
      <Grid.Container gap={2} justify="flex-start">
        {stock.map((item, index) => {
          const currentItem = cart.find((cartItem) => cartItem.id === item.id);
          const reservedAmount = currentItem?.amount || 0;
          return (
            <Grid xs={12} sm={3} key={index}>
              <ProductCard
                onAddToCart={handleAddToCard}
                id={item.id}
                product_name={item.product_name}
                price={item.price}
                stock={item.stock}
                imageSrc={item.image}
                reservedAmount={reservedAmount}
              />
            </Grid>
          );
        })}
      </Grid.Container>
    </Container>
  );
}
