import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useIsMobile } from "utils/mediaQueries";
import MinusIcon from "components/Icons/minus";
import PlusIcon from "components/Icons/plus";
import AddToCard from "components/Icons/addToCard";
import { round } from "utils/math";

import {
  styled,
  Card,
  Row,
  Text,
  Grid,
  Col,
  Button,
  Input,
} from "@nextui-org/react";

export const GridItem = styled(Grid, {
  d: "flex",
  fd: "column",
  cursor: "pointer",
  transition: "$default",
  "&:hover": {
    opacity: 0.8,
  },
  ai: "center",
});

export default function ProductCard({
  id,
  product_name,
  price,
  stock,
  onAddToCart,
  reservedAmount,
  imageSrc,
}) {
  const [amount, setAmount] = useState(0);
  const isMobile = useIsMobile();
  const handleInputChange = useCallback(
    (e) => {
      const { valueAsNumber } = e.target;
      if (valueAsNumber < 0) return;
      const limit = stock - reservedAmount;
      const newValue = valueAsNumber > limit ? limit : valueAsNumber;
      setAmount(newValue);
    },
    [stock, reservedAmount]
  );

  const handleIncrease = useCallback(() => {
    setAmount(amount + 0.5);
  }, [amount]);

  const handleDecrease = useCallback(() => {
    setAmount(amount - 0.5);
  }, [amount]);

  const handleAddToCart = useCallback(() => {
    onAddToCart({
      id,
      amount,
    });
    setAmount(0);
  }, [id, amount, onAddToCart]);

  const disableAddToCart = useMemo(() => {
    const limit = stock - reservedAmount;
    const disabled = amount > stock || amount > limit || amount === 0;
    return disabled;
  }, [amount, stock, reservedAmount]);

  const totalPrice = reservedAmount * parseFloat(price);
  const reservationIsFull = stock === reservedAmount;
  return (
    <Card hoverable>
      <Card.Body css={{ px: "$8" }}>
        <Grid.Container>
          <GridItem sm={4} xs={12}>
            <Card.Image
              objectFit="contained"
              src={imageSrc}
              width="100%"
              height="auto"
              alt={product_name}
            />
          </GridItem>
          <GridItem
            sm={8}
            css={{
              px: "$8",
              "@xsMax": {
                py: "$8",
              },
            }}
            xs={12}
          >
            <Row wrap="wrap" justify="space-between">
              <Col>
                <Text b css={{ h: 50, d: "block" }}>
                  {product_name}
                </Text>
                <Text css={{ color: "$accents4", fontWeight: "$semibold" }}>
                  ${price} <Text as="sub"> / kg </Text>
                </Text>
              </Col>
            </Row>
            <Row css={{ mt: 10 }}>
              <Text size={10}>
                Stock: <Text b> {stock} kg</Text>
              </Text>
            </Row>
            {reservedAmount ? (
              <Row css={{ mt: 10 }}>
                <Text color="#0040AE" size={10}>
                  You Reserved{" "}
                  <Text color="#0040AE" b>
                    {" "}
                    {reservedAmount} kg
                  </Text>{" "}
                  = ${round(totalPrice)}
                </Text>
              </Row>
            ) : null}
          </GridItem>
        </Grid.Container>
      </Card.Body>
      <Card.Footer justify="flex-start">
        <Grid.Container>
          <Grid sm={12} md={8}>
            {reservationIsFull || stock === 0 ? (
              <Text color="error"> Out of Stock </Text>
            ) : (
              <Row>
                <Button
                  disabled={amount === 0 || amount - 0.5 < 0}
                  onClick={handleDecrease}
                  light
                  size="xs"
                  auto
                  rounded
                  icon={<MinusIcon width={18} height={18} />}
                />
                <Input
                  aria-labelledby={`p_card_${id}`}
                  onChange={handleInputChange}
                  value={amount}
                  size="xs"
                  css={{ w: 70, input: { ta: "center" } }}
                  type="number"
                  rounded
                  max={stock}
                  min={0}
                />
                <Button
                  disabled={amount === stock || stock === reservedAmount}
                  onClick={handleIncrease}
                  light
                  size="xs"
                  auto
                  rounded
                  icon={<PlusIcon width={18} height={18} />}
                />
              </Row>
            )}
          </Grid>
          <Grid sm={12} xs={12} md={4}>
            <Button
              onClick={handleAddToCart}
              disabled={disableAddToCart}
              css={{
                "@xsMax": {
                  w: "100%",
                  mt: "$8",
                },
              }}
              size={isMobile ? "md" : "xs"}
            >
              {" "}
              {isMobile ? "Add To Card" : <AddToCard width={18} height={18} />}
            </Button>
          </Grid>
        </Grid.Container>
      </Card.Footer>
    </Card>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  product_name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  reservedAmount: PropTypes.number.isRequired,
  imageSrc: PropTypes.isRequired,
};
