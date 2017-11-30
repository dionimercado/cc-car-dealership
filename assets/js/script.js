const url = '/assets/data/inventory.json';

const cars = [];

// noprotect
$.getJSON( url, ( data ) => {

    const makes = [];

    const inventory = $(data);

    $('#search-form').on('submit', function(e) {
        // console.log( $( this ).serializeArray() );
        const formData = $( this ).serializeArray();
        console.log(`
            Make: ${formData[0].value}
            Model: ${formData[1].value}
            Year: ${formData[2].value}
        `);

        e.preventDefault();

        $('.ajax-inventory').html('<h2 class="loading" style="text-align: center;">Loading inventory...</h2>');

        const cars = [];

        $.each(inventory, function(i, car) {
            // if (car.make.search(new RegExp(/Audi/i)) != -1) {
            if( car.make === formData[0].value && car.model === formData[1].value && Number(car.year) === Number(formData[2].value) ) {
                cars.push(`
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
                                    <p>$<span class="regular-price">${car.MSRP}</span> <button id="add-tax" class="btn btn-primary" style="float: right;">Add tax</button></p>
                                </div>
                            </header>
                        </article>
                    </div>
                `);
                return;
            } else if( car.make === formData[0].value && car.model === formData[1].value && formData[2].value === '' ) {
                cars.push(`
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
                                <p>$<span class="regular-price">${car.MSRP}</span> <button id="add-tax" class="btn btn-primary" style="float: right;">Add tax</button></p>
                            </div>
                        </header>
                    </article>
                </div>
            `);
            return;
            } else if( car.make === formData[0].value && formData[1].value === '' && formData[2].value === '' ) {
                cars.push(`
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
                                <p>$<span class="regular-price">${car.MSRP}</span> <button id="add-tax" class="btn btn-primary" style="float: right;">Add tax</button></p>
                            </div>
                        </header>
                    </article>
                </div>
            `);
            return;

            }else{
                setTimeout( () => {
                    $('.ajax-inventory').html(`
                    <div class="col-lg-12">
                        <div class="alert alert-danger" role="alert">
                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span class="sr-only">Error:</span>
                            No cars found in our inventory.
                        </div>
                    </div>
                  `);
                }, 2000);

                return;

            }
        });

        setTimeout( () => {
            $('.ajax-inventory .loading').remove();
            $('.ajax-inventory').html(cars);
        }, 2000);


    });


    // console.log("inventory " + inventory);
    for (let i=0;i<inventory.length;i++) {
        // console.log(inventory[i].make +" "+inventory[i].model)

        makes.push(`<option value="${inventory[i].make}">${inventory[i].make}</option`);

    }

    // Populate search form with JSON
    $('#makeSelect').on('change', function() {

        const currentMake = $(this).val();

        const models = [];
        const years = [];


        inventory.filter(function (key,car){
            // return car.make==='Audi'
            if( car.make===currentMake ) {
                models.push(`<option value="" selected>All models</option`);
                models.push(`<option value="${car.model}">${car.model}</option`);
                years.push(`<option value="" selected>All years</option`);
                years.push(`<option value="${car.year}">${car.year}</option`);
            }
        });


        // console.log(models);

        $('#modelSelect').html($.unique(models));
        $('#yearSelect').html($.unique(years).sort().reverse());

    });



    $('#makeSelect').append($.unique(makes));

 });





$.getJSON( url, ( data ) => {
    // console.log(data);

    $.each( data, ( key, car ) => {
        cars.push(`
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
                            <p>$<span class="regular-price">${car.MSRP}</span> <button id="add-tax" class="btn btn-primary" style="float: right;">Add tax</button></p>
                        </div>
                    </header>
                </article>
            </div>
        `);

    });

    setTimeout( () => {
        $('.ajax-inventory .loading').hide();
        $('.ajax-inventory').append(cars);
    }, 2000);


    // Add tax button handler
    $('body').on('click', '#add-tax', function(e) {
        e.preventDefault();

        let regPrice = $(this).parent().find('.regular-price').text();
        regPrice = parseInt(regPrice.replace(/\,/g,''));

        let tax = regPrice * 0.08;

        let total = regPrice + tax;

        if( ! $(this).parent().find('.regular-price').parent().hasClass('w-tax') ) {
            $(this).parent().find('.regular-price').html($.number( total ));
            $(this).parent().addClass('w-tax');
            $(this).addClass('disabled');
        }

    });

});


