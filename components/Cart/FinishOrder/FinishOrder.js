import React, { useCallback } from "react";
import { Grid, Button, useInput, Input } from "@nextui-org/react";
import PropTypes from "prop-types";

const validateEmail = (value) => {
  return /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};
export default function CustomerInfo({ onOrderConfirm }) {
  const { value, reset, bindings } = useInput("");

  const helper = React.useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Valid email" : "Enter a valid email",
      color: isValid ? "success" : "error",
      isValid: isValid,
    };
  }, [value]);

  const handleComfirmClick = useCallback(() => {
    onOrderConfirm(value);
    reset();
  }, [value, onOrderConfirm, reset]);

  return (
    <Grid>
      <Input
        id="finish-order"
        {...bindings}
        fullWidth
        clearable
        shadow={false}
        onClearClick={reset}
        status={helper.color}
        color={helper.color}
        helperColor={helper.color}
        helperText={helper.text}
        type="email"
        placeholder="Enter your Email here to confirm the order"
      />
      <Button
        disabled={!helper.isValid}
        onClick={handleComfirmClick}
        css={{ w: "100%", mt: "$10" }}
      >
        Confirm Order
      </Button>
    </Grid>
  );
}
CustomerInfo.propTypes = {
  onOrderConfirm: PropTypes.func.isRequired,
};
