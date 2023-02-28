import React from 'react'
import './CalendarLegend.scss'

export default () => 
<div class="calendar-legend">
  <div class="color-container">
    <div class="color red"></div>
    <span>Schools Closed (holidays, in-service, etc.)</span>
  </div>
  <div class="color-container">
    <div class="color brown"></div>
    <span>Elementary Schools Closed</span>
  </div>
  <div class="color-container">
    <div class="color purple"></div>
    <span>High School Closed (exam days)</span>
  </div>
  <div class="color-container">
    <div class="color blue"></div>
    <span>Snow days, unplanned closures</span>
  </div>

</div>