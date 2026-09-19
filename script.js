const PRICE = 599;
const form = document.getElementById("orderForm");
const modal = document.getElementById("paymentModal");
const toast = document.getElementById("successToast");

function scrollToOrder(){ document.getElementById("order").scrollIntoView({behavior:"smooth"}); }
function closePayment(){ modal.classList.remove("show"); document.body.style.overflow=""; }

form?.addEventListener("submit",(e)=>{
  e.preventDefault();
  const phone = document.getElementById("customerPhone").value.replace(/\D/g,"");
  if(phone.length < 10){ alert("Please enter a valid 10-digit phone number."); return; }
  modal.classList.add("show"); document.body.style.overflow="hidden";
});

document.getElementById("paidBtn")?.addEventListener("click",()=>{
  const utr = document.getElementById("utrNumber").value.trim();

  if(!utr || utr.length < 6){
    alert("Payment submit செய்யும் முன் UTR / Transaction Number enter செய்யவும்.");
    document.getElementById("utrNumber").focus();
    return;
  }

  // The QR itself requests exactly ₹599. The front-end cannot independently
  // verify the bank transaction; the admin must verify the UTR before dispatch.
  const requiredAmount = 599;
  const order = {
    id:"HT-" + Date.now().toString().slice(-7),
    name:document.getElementById("customerName").value.trim(),
    phone:document.getElementById("customerPhone").value.trim(),
    address:document.getElementById("customerAddress").value.trim(),
    product:"Hot Tin Food Heater",
    amount:requiredAmount,
    amountPaid:requiredAmount,
    utr:utr,
    status:"Payment submitted / Verify ₹599",
    createdAt:new Date().toLocaleString()
  };

  const orders = JSON.parse(localStorage.getItem("hotTinOrders") || "[]");
  orders.unshift(order);
  localStorage.setItem("hotTinOrders",JSON.stringify(orders));

  closePayment();
  form.reset();
  document.getElementById("utrNumber").value="";
  toast.textContent="✓ UTR submitted. Admin must verify the ₹599 payment before dispatch.";
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),4500);
});

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
