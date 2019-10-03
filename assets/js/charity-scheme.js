jQuery( document ).ready(
    function($) {
        var formsContainer = document.querySelector('.form-content');
        var formOne = document.querySelector('#charity-donation-form-one');
        var formOneSelect = document.querySelector('#charity-donation-form-one select');
        var formOneBtn = document.querySelector('#sub_btn');
        var csTypeField = document.querySelector('.cs-type-field');
        var formTwo;
        var form;
        // Charity Scheme Type Form One Exicution...
        if( formOne ) {
            formOne.addEventListener( 'submit', e => {
                e.preventDefault();
                csTypeField.innerText = '';                
                var charityScheme = document.querySelector( '#charity_schemes' ).value,
                    ajaxURL = formOne.getAttribute('data-url');
                // Field Validation...
                if( charityScheme === '' ) {
                    console.log( 'Required field is empty! Please Select an option.' );
                    csTypeField.innerText = 'You have to choose an option before proceeding!';
                    return;
                }
                // AJAX Call...
                $.ajax({                    
                    url : ajaxURL,
                    type : 'post',
                    data : {
                        charityScheme : charityScheme,
                        action : 'save_charity_donation_form_one'
                    },
                    beforeSend: function(){
                        formOne.querySelector( '.lds-charity' ).classList.add( 'show' );
                    },
                    error : function( res ) {
                        console.log( res );
                    },
                    complete: function(){
                        formOne.querySelector( '.lds-charity' ).classList.remove( 'show' );
                    },
                    success : function( res ) {
                        if( res == 0 ) {
                            console.log( 'Unable to submit your donation plan! Please try again later.' );
                        } else {
                            console.log( 'Congratulations! Your donation plan has been successfully submitted.' );
                            
                            if( res ) {
                                var container = document.createElement( 'div' );
                                container.setAttribute( 'class', 'form-two-container' );
                                container.innerHTML = res;
                                // Appending Form Two...
                                formsContainer.appendChild(container);
                                // Disabled Form One
                                formOneSelect.setAttribute( 'disabled', 'disabled' );
                                formOneSelect.style.opacity = '0.5';
                                formOneBtn.setAttribute( 'disabled', 'disabled' );
                                formOneBtn.style.display = 'none';
                                formTwo = formOne.parentElement.nextElementSibling.firstChild;
                                // Charity Scheme Type Form Two Exicution...
                                if( formTwo !== '' ) {                                    
                                    formTwo.addEventListener( 'submit', e => {
                                        e.preventDefault();                                            
                                        var country = formTwo.querySelector( '#country' ).value,
                                            county = formTwo.querySelector( '#county' ).value,
                                            city = formTwo.querySelector( '#city' ).value,
                                            cptName = formTwo.querySelector( 'input[name="cpt_name"]' ).value,
                                            ajaxURL = formTwo.getAttribute('data-url'),
                                            institutionType;                                                
                                            if( cptName === 'edu_institutions' ) {
                                                institutionType = formTwo.querySelector( '#edu_type' ).value;
                                            } else {
                                                institutionType = formTwo.querySelector( '#sport_type' ).value;
                                            }                            
                                            var countryTextMsg = formTwo.querySelector('.cs_country'),
                                                countyTextMsg = formTwo.querySelector('.cs_county'),
                                                cityTextMsg = formTwo.querySelector('.cs_city');
                                            // Setting Info Messages Span Empty...
                                            countryTextMsg.innerText = '';
                                            countyTextMsg.innerText = '';
                                            cityTextMsg.innerText = '';                                                                        
                                            // Field Validation...
                                            if( country === '0' ) {
                                                countryTextMsg.innerText = 'Please select a country!';
                                                return;
                                            }
                                            if( county === '0' ) {
                                                countyTextMsg.innerText = 'Please select a county!';
                                                return;
                                            }
                                            if( city === '0' ) {
                                                cityTextMsg.innerText = 'You have to select a city!';
                                                return;
                                            }
                                            if( institutionType === '0' ) {
                                                if( formTwo.querySelector('.cs_edu_type') ) {formTwo.querySelector('.cs_edu_type').innerText = '';}
                                                if( formTwo.querySelector('.cs_sport_type') ) {formTwo.querySelector('.cs_sport_type').innerText = '';}
                                               
                                                if( cptName === 'edu_institutions' ) {
                                                    formTwo.querySelector('.cs_edu_type').innerText = 'You have to select a Institution!';
                                                    return;
                                                } else {
                                                    formTwo.querySelector('.cs_sport_type').innerText = 'You have to select a Club!';
                                                    return;
                                                }                                                
                                            }
                                        // AJAX Call...
                                        $.ajax({
                            
                                            url : ajaxURL,
                                            type : 'post',
                                            data : {
                                                country : country,
                                                county : county,
                                                city : city,
                                                institutionType : institutionType,
                                                cptName : cptName,
                                                action : 'save_charity_donation_form_two'
                                            },
                                            beforeSend: function(){
                                                formTwo.querySelector( '.lds-charity' ).classList.add( 'show' );
                                            },
                                            error : function( res ) {
                                                console.log( res );
                                            },
                                            complete: function(){
                                                formTwo.querySelector( '.lds-charity' ).classList.remove( 'show' );
                                            },
                                            success : function( res ) {
                                                var formTwoSelectFields = formTwo.querySelectorAll('select');
                                                if( res == 0 ) {
                                                    console.log( 'Unable to submit your donation plan! Please try again later.' );
                                                    // disable all the form fields of Form Two                                                        
                                                    if(formTwoSelectFields) {
                                                        formTwoSelectFields.forEach( selectField => {
                                                            selectField.setAttribute( 'disabled', 'disabled' );
                                                            selectField.style.opacity = '0.5';
                                                        });
                                                    }
                                                    var msgDiv = document.createElement('div');
                                                    msgDiv.setAttribute('id', 'msg-div');
                                                    msgDiv.innerHTML = `<h4>Sorry! Unable to submit your request! No results found...</h4><h5>Please check out your options and try again or later.</h5><div class="charity-msg-div"><a id="msg-div-link_one" href="/charity-scheme" rel="nofollow">Try Again</a><a id="msg-div-link_two" href="/user-profile" rel="nofollow">Take Me Back</a></div>`;          
                                                    // Hidding Proceed Button
                                                    formTwo.querySelector('#option_btn').style.display = 'none';
                                                    // Appending message
                                                    formsContainer.appendChild(msgDiv);                                                    
                                                } else {
                                                    console.log( 'Congratulations! Your donation plan has been successfully submitted.' );                            
                                                    if( res ) {
                                                        // Hidding Proceed Button
                                                        formTwo.querySelector('#option_btn').style.display = 'none';
                                                        var container = document.createElement( 'div' );
                                                            container.setAttribute( 'class', 'form-Three-container' );
                                                            container.innerHTML = res;
                                                        // disable all the form fields of Form Two             
                                                        if(formTwoSelectFields) {
                                                            formTwoSelectFields.forEach( selectField => {
                                                                selectField.setAttribute( 'disabled', 'disabled' );
                                                                selectField.style.opacity = '0.5';
                                                            });
                                                        }
                                                        // Appending Form Two...
                                                        formsContainer.appendChild(container);
                                                        form = formOne.parentElement.nextElementSibling.nextElementSibling.firstChild.querySelector('#charity-donation-data-form');
                                                        // Final Form Exicution...
                                                        if( form ) {
                                                            
                                                            form.addEventListener( 'submit', (e) => {

                                                                e.preventDefault();
                                                                
                                                                var charityName = form.querySelector( '#donate_options' ).value,
                                                                    instituteType = form.querySelector( '#selected_type' ).value;
                                                                    postTypeID = form.querySelector( '#selected_cpt_name' ).value,
                                                                    donnerID = form.querySelector( '#cpt_user_id' ).value,
                                                                    country = form.querySelector( '#selected_country' ).value,
                                                                    county = form.querySelector( '#selected_county' ).value,
                                                                    city = form.querySelector( '#selected_city' ).value,
                                                                    ajaxURL = form.getAttribute('data-url'),
                                                                    csMsgInfo = form.querySelector( 'span' );
                                                                    
                                                                csMsgInfo.innerText = '';

                                                                if( charityName == '' ) {
                                                                    console.log( 'Required option is empty!' );
                                                                    csMsgInfo.innerText = 'Required option is empty!';
                                                                    return;
                                                                }
                                                                // AJAX Calling Form Final Form Data
                                                                $.ajax({

                                                                    url : ajaxURL,
                                                                    type : 'post',
                                                                    data : {
                                                                        name : charityName,
                                                                        instituteType : instituteType,
                                                                        postTypeID : postTypeID,
                                                                        donnerID : donnerID,
                                                                        country : country,
                                                                        county : county,
                                                                        city : city,
                                                                        action : 'save_charity_donation_data_form'
                                                                    },                                                                    
                                                                    beforeSend: function(){
                                                                        form.querySelector( '.lds-charity' ).classList.add( 'show' );
                                                                    },
                                                                    error : function( res ) {
                                                                        console.log( res );
                                                                    },
                                                                    complete: function(){
                                                                        form.querySelector( '.lds-charity' ).classList.remove( 'show' );
                                                                    },
                                                                    success : function( res ) {
                                                                        if( res == 0 ) {
                                                                            console.log( 'Unable to submit your donation plan! Please try again later.' );                   
                                                                        } else {
                                                                            console.log( 'Congratulations! Your donation plan has been successfully submitted.' );
                                                                            formsContainer.innerHTML = '';
                                                                            formsContainer.innerHTML = `<div id="success-msg-div"><h4>Congratulations <a href="/user-profile" ref="nofollow">${res}</a>! Your donation plan has been successfully submitted.</h4></div>`;
                                                                        }
                                                                    }

                                                                } );
                                                                
                                                            } );

                                                        } // End IF Satement OF FINAL FORM

                                                    }
                                                        
                                                }
                                            }
                            
                                        });
                            
                                    } );

                                } // End IF Satement OF FORM TWO
                                                                    
                            }
                                
                        }

                    }

                    
                });
                
            } );
            
        } // End IF Satement OF FORM ONE
         
    }

);