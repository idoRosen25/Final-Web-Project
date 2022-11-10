const stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

let elements;
$(() => {
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
      return_url: "http://localhost:5200/checkout/create-payment",
    },
  });

  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

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

function showMessage(messageText) {
  const messageContainer = $("#payment-message");

  if (messageText.includes("succeeded")) return;
  messageContainer[0].classList.remove("hidden");
  messageContainer[0].textContent = messageText;
}

function setLoading(isLoading) {
  if (isLoading) {
    $("#submit")[0].disabled = true;
    $("#spinner")[0].classList.remove("hidden");
    $("#button-text")[0].classList.add("hidden");
  } else {
    $("#submit")[0].disabled = false;
    $("#spinner")[0].classList.add("hidden");
    $("#button-text")[0].classList.remove("hidden");
  }
}
