package com.example.homeplant

import com.google.gson.annotations.SerializedName

data class PlantModel(
    @SerializedName("id") val id: Int,
    @SerializedName("plant_type") val plantType: Int,
    @SerializedName("plant_type_details") val plantTypeDetails: PlantType?,
    @SerializedName("custom_name") val customName: String,
    @SerializedName("location") val location: String?,
    @SerializedName("photo") val photoUrl: String?,

    @SerializedName("last_watered_date") val lastWateredDate: String,
    @SerializedName("last_fertilized_date") val lastFertilizedDate: String,
    @SerializedName("last_repotted_date") val lastRepottedDate: String?,
    @SerializedName("next_watering_date") val nextWateringDate: String,
    @SerializedName("next_fertilizing_date") val nextFertilizedDate: String,
    @SerializedName("next_repotting_date") val nextRepottingDate: String?,

    @SerializedName("status") val status: String,
    @SerializedName("status_display") val statusDisplay: String,
    @SerializedName("has_sensor") val hasSensor: Boolean,
    @SerializedName("notes") val notes: String?,

    @SerializedName("days_until_watering") val daysUntilWatering: Int,
    @SerializedName("days_until_fertilizing") val daysUntilFertilizing: Int,

    @SerializedName("created_at") val createdAt: String,
    @SerializedName("updated_at") val updatedAt: String
)