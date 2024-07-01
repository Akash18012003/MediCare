import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [medCat, setmedCat] = useState([]);
  const [medIteam, setmedIteam] = useState([]);

  const loadData = async () => {
    let response = await fetch('https://medicareserver-git-main-akashs-projects-c96b2f8a.vercel.app/api/medicineData', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setmedIteam(response[0]);
    setmedCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner " id="carousel">
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input
                  className="form-control me-2 w-75 bg-white text-dark"
                  type="search"
                  placeholder="Type in..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value) }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://st3.depositphotos.com/9335968/37050/i/450/depositphotos_370508154-stock-photo-packet-heroin-pills-drug-addiction.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNpbmVzfGVufDB8fDB8fHww"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://static5.depositphotos.com/1005360/519/i/450/depositphotos_5194551-stock-photo-medical-syringe-and-pills.jpg"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        { medCat?.map((data) => (
            <div key={`category-${data._ids || data.CategoryName}`} className="row mb-3">
              <div className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {medIteam.length > 0
                ? medIteam
                  .filter((iteam) => (iteam.CategoryName === data.CategoryName) && (iteam.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filterIteams) => (
                    <div key={`item-${filterIteams._id}`} className="col-12 col-md-6 col-lg-3">
                      <Card
                        medIteam={filterIteams}
                        // medName={filterIteams.name}
                        options={filterIteams.options[0]}
                        // imgSrc={filterIteams.img}
                      ></Card>
                    </div>
                  ))
                : (
                  <div key={`noData-${data._ids || data.CategoryName}`}>No such data found</div>
                )}
            </div>
          ))
          }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
