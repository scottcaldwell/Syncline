Syncline
========
A tool aimed at geotechnical engineers to streamline the process of collecting, reviewing and approving site investigation information.

<img src='https://jobenko.com/images/syncline-2.jpg'>

*Note:* This is an early proof of concept developed while at Lighthouse Labs.

Get Started
-----------

Clone the repo:
`git clone git@github.com:joelkbennett/Syncline.git`

Run Bundler:
`bundle install`

Prep the database:
`rake db:create db:migrate`

For demonstration purposes we have added mock data to the seed file: `rake db:seed`

Start the server:
`rails s`

Technical Details
-----------------

Build on Rails and PostgreSQL. Heavy use of Javascript/jQuery and Handlebars for the frontend, as well as Mapbox, HighCharts and custom Canvas charts.
