const CheckoutSteps = ({ current = 0 }) => {
  return (
    <ul className="steps steps-horizontal text-sm lg-steps-horizontal w-full mt-4">
      {["Identitas", "Metode Pembayaran", "Tempatkan Pesanan"].map(
        (step, index) => (
          <li
            key={step}
            className={`step ${index <= current ? "step-warning" : ''}`}
          >
            {step}
          </li>
        )
      )}
    </ul>
  );
};
export default CheckoutSteps
