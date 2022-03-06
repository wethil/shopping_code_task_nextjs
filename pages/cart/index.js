import React, { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardOnCart from "components/Cart/CardOnCart/CardOnCart";
import { removeFromCart, changeAmount, resetCart } from "slices/cart.slice";
import { round } from "utils/math";
import { useIsMobile } from "utils/mediaQueries";
import FinishOrder from "@/components/Cart/FinishOrder/FinishOrder";
import {
  Container,
  Grid,
  Row,
  Text,
  Col,
  Modal,
  Button,
} from "@nextui-org/react";
import { createOrder } from "slices/stock.slice";
import { useRouter } from "next/router";

export default function Cart() {
  const isMobile = useIsMobile();
  const [modalIsVisible, setModalVisible] = useState(false);
  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = useCallback(() => setModalVisible(false), []);

  const cart = useSelector((state) => state.cart);
  const stock = useSelector((state) => state.stock.products);
  const dispatch = useDispatch();

  const handleRemoveFromCart = useCallback(
    (item) => dispatch(removeFromCart(item)),
    [dispatch]
  );

  const handleChangeAmount = useCallback(
    (item) => dispatch(changeAmount(item)),
    [dispatch]
  );

  const cartSummary = useMemo(() => {
    let totalReservationPrice = 0;
    const reservedProducts = [];
    cart.forEach((cartItem) => {
      const itemOnStock = stock.find(
        (stockItem) => stockItem.id === cartItem.id
      );
      reservedProducts.push({
        ...itemOnStock,
        ...cartItem,
      });
      totalReservationPrice =
        totalReservationPrice + cartItem.amount * parseFloat(itemOnStock.price);
    });
    return { totalReservationPrice, reservedProducts };
  }, [cart, stock]);

  const { totalReservationPrice, reservedProducts } = cartSummary;

  const handleConfirmOrder = useCallback(
    (email) => {
      dispatch(
        createOrder({
          orders: cart,
          orderInfo: {
            email,
            totalReservationPrice: round(totalReservationPrice),
          },
        })
      );
      openModal();
      dispatch(resetCart());
    },
    [cart, totalReservationPrice, dispatch, openModal]
  );
  const router = useRouter();

  return (
    <Container>
      <Row justify="flex-end">
        <Button
          onClick={() => router.push("/")}
          css={{ mb: "$8", "@xsMax": { w: "100%" } }}
        >
          Go Back
        </Button>
      </Row>
      {cart.length ? (
        <Row gap={2} wrap="wrap">
          <Col span={isMobile ? 12 : 4}>
            <Grid>
              {reservedProducts.map((item, index) => (
                <Row direction="row" key={index} css={{ mb: "$5" }}>
                  <Col span={8}>
                    <Text>{item.product_name}</Text>
                  </Col>
                  <Col span={4}>
                    <Text>
                      <Text span color="#444444">
                        {item.amount}
                      </Text>{" "}
                      * <Text b>${item.price}</Text>
                    </Text>
                  </Col>
                </Row>
              ))}
              <Row direction="row" css={{ mb: "$16" }}>
                <Col span={8}>
                  <Text> Total: </Text>
                </Col>
                <Col span={4}>
                  <Text b>${round(totalReservationPrice)}</Text>
                </Col>
              </Row>
            </Grid>
            <FinishOrder onOrderConfirm={handleConfirmOrder} />
          </Col>

          <Col span={isMobile ? 12 : 8}>
            <Grid.Container gap={1} justify="center">
              {reservedProducts.map((item, index) => {
                return (
                  <Grid xs={12} sm={6} key={index}>
                    <CardOnCart
                      id={item.id}
                      key={index}
                      product_name={item.product_name}
                      price={item.price}
                      stock={item.stock}
                      imageSrc={item.image}
                      reservedAmount={item.amount}
                      onRemoveFromCart={handleRemoveFromCart}
                      onChangeAmount={handleChangeAmount}
                    />
                  </Grid>
                );
              })}
            </Grid.Container>
          </Col>
        </Row>
      ) : (
        <Row>
          <Text>You don&apos;t have any reserved products at the moment </Text>
        </Row>
      )}
      <Modal
        closeButton
        aria-labelledby="confirm-modal"
        open={modalIsVisible}
        onClose={closeModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Status
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text> Your order is completed </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
