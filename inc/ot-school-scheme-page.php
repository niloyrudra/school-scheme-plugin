  
<?php

$option_names = get_option( 'school_data' );
if( $option_names ){
    
    $country_id         = $option_names['country_id'];
    $county_id          = $option_names['county_id'];
    $city_id            = $option_names['city_id'];
    $edu_type_id        = $option_names['edu_type_id'];
    $school_names       = $option_names['school_names'];
    $addresses          = $option_names['address'];
    $street_name        = $option_names['street_name'];
    $towns              = $option_names['towns'];
    $postal_codes       = $option_names['postal_codes'];
    $contact_names      = $option_names['contact_names'];
    $telephone_numbers  = $option_names['telephone_numbers'];
    $minor_groups       = $option_names['minor_groups'];
    $nf_types           = $option_names['nf_types'];
    $staffs             = $option_names['staffs'];
    $students           = $option_names['students'];

    if( $school_names && count( $school_names ) > 1 ) {
        foreach ( $school_names as $index => $school_name ) {
            
            if ( ! post_exists( $school_name, '', '', 'edu_institutions' ) ) {

                $content = '<h2><u>Information about <b>' . $school_name . '</b></u></h2><h3><b>Address</b>:</h3><p><b>Street Name</b>: ' . ( $street_name ? $street_name[ $index ] : '---' ) . '</p><p><b>Twon</b>: ' . ( $towns ? $towns[ $index ] : '---' ) . '</p><p><b>Postal Code</b>: ' . ( $postal_codes ? $postal_codes[ $index ] : '---' ) . '</p><h4>Contact Number:</h4><p><b>Contact Name</b>: ' . ( $contact_names ? $contact_names[ $index ] : '---' ) . '</p><p><b>Telephone Number</b>: ' . ( $telephone_numbers ? $telephone_numbers[ $index ] : '---' ) . '</p><h4>Additional Information:</h4><p><b>Minor Group</b>: ' . ( $minor_groups ? $minor_groups[ $index ] : '---' ) . '</p><p><b>NF Type</b>: ' . ( $nf_types ? $nf_types[ $index ] : '---' ) . '</p>';

                $content_nursery = '<h3>Address:<p>' . ( $addresses ? $addresses[ $index ] : '---' ) . '</p></h3><h4>Contact Information:</h4><p><b>Contact Name</b>: ' . ( $contact_names ? $contact_names[ $index ] : '---' ) . '</p><p><b>Telephone Number</b>: ' . ( $telephone_numbers ? $telephone_numbers[ $index ] : '---' ) . '</p><h5>Staff: ' . ( $staffs ? $staffs[ $index ] : 0 ) . '</h5><h5>Student: ' . ( $students ? $students[ $index ] : 0 ) . '</h5>';

                $content = $addresses ? $content_nursery : $content;

                wp_insert_post([
                    'post_title'    => wp_strip_all_tags( $school_name ),
                    'post_content'  => $content,
                    'post_status'   => 'publish',
                    'post_author'   => 1,
                    'post_type'     => 'edu_institutions',
                    'tax_input'     => [
                        'country'           => [ $country_id ],
                        'county'            => [ $county_id ],
                        'city'              => [ $city_id ],
                        'edu_type'          => [ $edu_type_id ],
                    ]
                ]);

            }

        }

    }

    if ( $school_names && count( $school_names ) == 1 ) {
       
        if ( ! post_exists( $school_names[0], '', '', 'edu_institutions' ) ) {

            $content = '<h2><u>Information about <b>' . $school_name . '</b></u></h2><h3><b>Address</b>:</h3><p><b>Street Name</b>: ' . ( $street_name ? $street_name[ 0 ] : '---' ) . '</p><p><b>Twon</b>: ' . ( $towns ? $towns[ 0 ] : '---' ) . '</p><p><b>Postal Code</b>: ' . ( $postal_codes ? $postal_codes[ 0 ] : '---' ) . '</p><h4>Contact Number:</h4><p><b>Contact Name</b>: ' . ( $contact_names ? $telephone_numbers[ 0 ] : '---' ) . '</p><p><b>Telephone Number</b>: ' . ( $telephone_numbers ? $telephone_numbers[ 0 ] : '---' ) . '</p><h4>Additional Information:</h4><p><b>Minor Group</b>: ' . ( $minor_groups ? $minor_groups[ 0 ] : '---' ) . '</p><p><b>NF Type</b>: ' . ( $nf_types ? $nf_types[ 0 ] : '---' ) . '</p>';

                $content_nursery = '<h3>Address:<p>' . ( $addresses ? $addresses[ 0 ] : '---' ) . '</p></h3><h4>Contact Information:</h4><p><b>Contact Name</b>: ' . ( $contact_names ? $contact_names[ 0 ] : '---' ) . '</p><p><b>Telephone Number</b>: ' . ( $telephone_numbers ? $telephone_numbers[ 0 ] : '---' ) . '</p><h5>Staff: ' . ( $staffs ? $staffs[ 0 ] : 0 ) . '</h5><h5>Student: ' . ( $students ? $students[ 0 ] : 0 ) . '</h5>';

                $content = $addresses ? $content_nursery : $content;

            wp_insert_post([
                'post_title'    => wp_strip_all_tags( $school_names[0] ),
                'post_content'  => $content,
                'post_status'   => 'publish',
                'post_author'   => 1,
                'post_type'     => 'edu_institutions'
            ]);

        }
    }

}

?>

<div class="wrap">

    <h1><?php _e("OT School Scheme Screen."); ?></h1>

    <?php settings_errors(); ?>

    <hr>

    <p class="description"><?php _e( 'Shortcode for School or Sports Scheme Form ' ); ?> <code>[charity]</code></p>
    <p><?php _e( 'Shortcode for User Profile' ); ?> <code>[charity-user-section]</code></p>

    <hr>

    <form action="options.php" method="post" id="school_scheme_name_gen_form">

    <?php

        settings_fields('school_data_options_group');
        do_settings_sections('ot_school_scheme');
        submit_button( 'Publish Educational Institutions' );
    ?>
    </form>

    <hr>

    <form id="featured_upload" method="post" action="#" enctype="multipart/form-data">
        <input type="file" name="school_csv_file" id="school_csv_file"  multiple="false" />
        <input type="hidden" name="file_id" id="file_id" value="55" />
        <?php wp_nonce_field( 'school_csv_file', 'school_csv_file_nonce' ); ?>
        <input id="submit_school_csv_file" name="submit_school_csv_file" type="submit" value="Upload" />
    </form>

    <hr>

    <?php 
        if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {

            require_once( ABSPATH . 'wp-admin/includes/image.php' );
            require_once( ABSPATH . 'wp-admin/includes/file.php' );
            require_once( ABSPATH . 'wp-admin/includes/media.php' );

            $file = $_FILES["school_csv_file"];

            $attachment_id = media_handle_upload("school_csv_file", 0);

            if (is_wp_error($attachment_id)) {
                // There was an error uploading the image.
                echo "Error! uploading file...";
            } else {
                // The image was uploaded successfully!
                echo "<span style=\"color:green;\">File added successfully with</span><br><b>ID</b>: " . $attachment_id . "<br><b>File Name</b>: " . $file['name'] . "<br><b>File Type</b>: " . $file['type'] . "<br><b>File Size</b>: " . $file['size'] . "<br><b>Error(s)</b>: " . $file['error'] . "<br>";
                
                echo "<hr>";

                echo 'File Permalink: <a href="' . esc_attr( get_attachment_link( $attachment_id ) ) . '">' . esc_html( get_attachment_link( $attachment_id ) ) . '</a>';


            }

        }

    ?>

</div>