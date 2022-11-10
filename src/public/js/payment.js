// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const items = [{ id: "xl-tshirt" }];
const stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

let elements;
$(() => {
  // The items the customer wants to buy
  if (window.location.search.includes("status=succeeded")) {
    $("#overlay").toggleClass("d-none");
    $("#overlayText").text("Payment Successful. Shipping in 3-5 days.");
    $("#overlay-dismiss-btn").click(() => {
      window.location.href = "/";
    });
    return;
  }

  initialize();
  checkStatus();

  $("#payment-form")[0].addEventListener("submit", handleSubmit);
});

// Fetches a payment intent and captures the client secret
async function initialize() {
  $.ajax({
    url: "/checkout/create-payment",
    type: "POST",
    data: JSON.stringify({ items }),
    contentType: "application/json",
    success: ({ clientSecret }) => {
      const appearance = {
        theme: "stripe",
      };
      elements = stripe.elements({
        appearance,
        clientSecret,
      });

      const paymentElement = elements.create("payment");
      paymentElement.mount("#payment-element");
      setTimeout(() => {
        $("#submit").toggleClass("d-none");
      }, 300);
    },
    error: (err) => {
      $("#overlay").toggleClass("d-none");
      $("#overlayText").text("Something went wrong. Please try again later.");
      $("#overlay-dismiss-btn").click(() => {
        window.location.href = "/cart";
      });
    },
  });
}

async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:5200/checkout/create-payment",
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = $("#payment-message");

  if (messageText.includes("succeeded")) return;
  messageContainer[0].classList.remove("hidden");
  messageContainer[0].textContent = messageText;
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    $("#submit")[0].disabled = true;
    $("#spinner")[0].classList.remove("hidden");
    $("#button-text")[0].classList.add("hidden");
  } else {
    $("#submit")[0].disabled = false;
    $("#spinner")[0].classList.add("hidden");
    $("#button-text")[0].classList.remove("hidden");
  }
}
