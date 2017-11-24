const url = 'http://127.0.0.1:5500/assets/data/inventory.json';

const cars = [];


fetch(url)
    .then(res => res.json())
    // .then(data => cars.push(...data))
    .then(data => {
        let output = '';
        data.forEach(function(car) {
            console.log(car);
            output += `
            <div class="col-md-6 col-lg-4">
                <article class="car-item">
                    <header>
                        <figure>
                            <img src="${car.image_url}" alt="">
                        </figure>
                        <h2>${car.make} ${car.model} ${car.year}</h2>
                        <div class="rating">
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
                            <span>(${Math.floor(car.rating)})</span>
                        </div>
                        <div class="price">
                            <small>starting msrp</small>
                            <p>$${car.MSRP}</p>
                        </div>
                    </header>
                </article>
            </div>
            `
        });
        setTimeout( () => {
            document.querySelector('.ajax-inventory').innerHTML = output;
        }, 2000);
    }).catch((err) => {
        console.log(err);
    })

    // cars.forEach(item, index)
    //     // car.make
    //     document.querySelector('.ajax-inventory').innerHTML =;

    console.log(cars);

