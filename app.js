import { fetchMovieAvailability, fetchMovieList } from "./api.js";
// fetch data
fetchMovieList().then((data) => {
  console.log(data);
  movieShow(data);
});

function movieShow(data) {
  document.getElementById("loader").remove();
  const main = document.getElementById("main");
  const div = document.createElement("div");
  div.className = "movie-holder";
  main.append(div);
  for (let element of data) {
    let a = document.createElement("a");
    a.className = "movie-link";
    a.href = `/${element.name}`;
    a.innerHTML = `<div class="movie" data-d='${element.name}'>
    <div class="movie-img-wrapper" style="background-image:url('${element.imgUrl}');">
    </div>
    <h4>${element.name}</h4>
    </div`;
    a.addEventListener("click", movieShow2);
    div.append(a);
  }
}
// move available

function movieShow2(event) {
  event.preventDefault();
  const div1 = document.createElement("div");
  div1.id = "loader";
  div1.textContent = "Loading...";
  const bookergridholder = document.getElementById("booker-grid-holder");
  bookergridholder.append(div1);
  const movieName = event.target.querySelector(".movie");
  fetchMovieAvailability(movieName).then((data) => {
    createdGrid(data);
  });
}

let flag = false;
function createdGrid(data) {
  document.getElementById("loader").remove();
  if (flag) return;
  flag = true;
  const pNode = document.getElementById("booker-grid-holder");

  document.querySelector("h3").classList.toggle("v-none");
  const Node1 = document.createElement("div");
  const Node2 = document.createElement("div");
  Node1.className = "booking-grid";
  Node2.className = "booking-grid";
  pNode.append(Node1, Node2);
  for (let i = 1; i <= 12; i++) {
    const div = document.createElement("div");
    div.id = `booking-grid-${i}`;
    div.textContent = i;
    if (data.includes(i)) dv.className = "unavailable-seat";
    else {
      div.className = "available-seat";
      div.addEventListener("click", func1);
    }
    Node1.append(div);
  }
  for (let i = 13; i <= 24; i++) {
    const div = document.createElement("div");
    div.id = `booking-grid-${i}`;
    if (data.includes(i)) dv.className = "unavailable-seat";
    else {
      div.className = "available-seat";
      div.addEventListener("click", func1);
    }
    div.textContent = i;
    Node2.append(div);
  }
}
function func1(event) {
  if (!event.currentTarget.className.includes("selected-seat"))
    event.currentTarget.classList.add("selected-seat");
  else event.currentTarget.classList.remove("selected-seat");
  if (document.getElementsByClassName("selected-seat").length > 0)
    document.getElementById("book-ticket-btn").className = "";
  else document.getElementById("book-ticket-btn").className = "v-none";
}
document.getElementById("book-ticket-btn").addEventListener("click", func2);
const seats = [];
function func2() {
  const booker = document.getElementById("booker");
  const seat = document.getElementsByClassName("selected-seat");
  for (let elem of seat) {
    seats.push(elem.textContent);
  }
  booker.innerHTML = "";
  const dv = document.createElement("div");
  dv.id = "confirm-purchase";
  booker.append(dv);
  const h = document.createElement("h3");
  h.textContent = `Confirm your booking for seat numbers:${seats.join(",")}`;
  dv.append(h);
  const frm = document.createElement("form");
  frm.id = "customer-detail-form";
  frm.setAttribute("onsubmit", "event.preventDefault();");
  dv.append(frm);
  frm.innerHTML = `<div>Email <input type="email" required/> </div>
    <div>Phone number <input type="tel" required/></div>
    <div><button type="submit">Purchase</button> </div>`;
  document.querySelector("button").addEventListener("click", func3);
}
function func3() {
  const inputdata = document.getElementsByTagName("input");
  const email = inputdata[0].value;
  const pNumber = inputdata[1].value;
  const booker = document.getElementById("booker");
  booker.innerHTML = "";
  const dv = document.createElement("div");
  dv.id = "success";
  booker.append(dv);
  dv.innerHTML = `<h3>Booking details</h3>
    <div>Seats: ${seats.join(", ")}</div>
    <div>Phone number:${pNumber}</div>
    <div>Email:${email}</div>`;
}
