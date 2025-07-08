import React,{useState} from 'react'


export default function Carousel() {
    const [Search, setSearch] = useState("")
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" id="carousel">
                <div className="carousel-caption" style={{zIndex :'10'}}>
                <div className="d-flex justify-content-center">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value = {Search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    <button className="btn bg-secondary" type="submit">Search</button>
                </div>
                </div>
                <div className="carousel-item active">
                    <img src="https://c8.alamy.com/comp/PC0E5M/shelf-of-disney-children-cuddly-soft-toys-on-display-kids-toy-shop-shelf-PC0E5M.jpg" className="d-block w-100" style={{filter:"brightness(40%)"}} alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://c8.alamy.com/comp/2PFGD1A/childrens-toys-on-shop-shelves-2PFGD1A.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://img.freepik.com/free-vector/font-design-word-toy-shop-with-many-toys-white-background_1308-42186.jpg" className="d-block w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
