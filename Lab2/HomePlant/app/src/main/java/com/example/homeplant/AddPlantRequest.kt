package com.example.homeplant

data class AddPlantRequest(
    val plant_type: Int,
    val custom_name: String,
    val location: String,
    val last_watered_date: String,
    val last_fertilized_date: String
)