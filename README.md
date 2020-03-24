## CORONA hub

*tl;dr* _Inspect and track data about the Corona virus outbreak_

Current prototype: https://covid19map.github.io/

The not so wonderful dashboard by [arcgis.com](https://experience.arcgis.com/experience/685d0ace521648f8a5beeeee1b9125cd)  - we're sry guys at arcgis(!) - was our starting point. We wanted not only to see what could be improved in terms of visualisation and usability, but also in terms of functionality and scaleability.

Our map makes data visual and _furthermore_ allows for tracking through an anonymous survey to get a way more detailed picture of the infection spread. The survey asks for a specific medically informed set of questions and evaluates a probability for the participant to be COVID-19 positive. It is important to note that it can't of course replace a laboratory test! But, the feature may get more important as we run out of testing capabilities.

The UI is a simple webapp built with React. The backend makes use of IBMs Cloudant database solution through a Node/Express server.

The major challenge was to find trustworthy data relays (, not shred our machines with buggy service workers) and find a unified data schema for large scale applications.

We are very proud to have created a stable data source that won't run into big problems on large scale and a slick UI :) 

The next steps for CORONA hub: Debug, debug, debug... refactor, refactor, refactor... and bring the survey into alpha stage as soon as possible. Then swiftly provide an anonymous login wall and finally and hopefully get as many users to participate in the survey soon after.
