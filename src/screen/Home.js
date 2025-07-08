import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
    const [Search, setSearch] = useState("")
    const [toyscato, settoyscato] = useState([])
    const [cato, setcato] = useState([])

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/toysdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json()
        settoyscato(response[0])
        setcato(response[1])
        // console.log(response[0],response[1]);
    }
    useEffect(() => { loadData() }, [])



    return (
        <div>
            <div> <Navbar></Navbar> </div>
            <div>
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div class="carousel-inner" id="carousel">
                        <div class="carousel-caption" style={{ zIndex: '10' }}>
                            <div class="d-flex justify-content-center">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button class="btn bg-secondary" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div class="carousel-item active">
                            <img src="https://c8.alamy.com/comp/PC0E5M/shelf-of-disney-children-cuddly-soft-toys-on-display-kids-toy-shop-shelf-PC0E5M.jpg" class="d-block w-100" style={{ filter: "brightness(80%)",height:"600px" ,objectFit:"fill"}} alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://c8.alamy.com/comp/2PFGD1A/childrens-toys-on-shop-shelves-2PFGD1A.jpg" class="d-block w-100" alt="..." style={{ filter: "brightness(80%)" ,height:"600px" ,objectFit:"fill"}} />
                        </div>
                        <div class="carousel-item">
                            <img src="https://img.freepik.com/free-vector/font-design-word-toy-shop-with-many-toys-white-background_1308-42186.jpg" class="d-block w-100" alt="..."  style={{ filter: "brightness(80%)" ,height:"600px" ,objectFit:"fill"}}/>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class='container'>
                {
                    Array.isArray(cato) && cato.length > 0 && cato.map((data, index)  => {
                        return (
                            <div className='row mb-2'>
                                <div className='fs-3 m-3' key={data._id}>{data.CategoryName}</div>
                                <hr />
                                {Array.isArray(toyscato) && toyscato.length > 0 && toyscato.filter((toy) => (toy.CategoryName === data.CategoryName) && (toy.name.toLowerCase().includes(Search.toLocaleLowerCase())))
                                    .map(filterItems => {
                                        return (
                                            <div className="col-12 col-md-6 col-lg-3" keys={filterItems._id}>
                                                <Card toyItems={filterItems}  options={filterItems.options[0]} description={filterItems.description}></Card>

                                            </div>
                                        )
                                    })
                                }
                            </div>

                        );
                    })
                }


            </div>

            <div> <Footer></Footer> </div>
        </div>
    );
}
