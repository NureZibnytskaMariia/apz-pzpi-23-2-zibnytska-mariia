package com.example.homeplant

import com.google.gson.annotations.SerializedName

data class PlantType(
    val id: Int,
    @SerializedName("name_uk") val nameUk: String,
    @SerializedName("name_en") val nameEn: String,

    @SerializedName("description_uk") val descriptionUk: String,
    @SerializedName("description_en") val descriptionEn: String,
    @SerializedName("care_tips_uk") val careTipsUk: String?,
    @SerializedName("care_tips_en") val careTipsEn: String?,

    @SerializedName("watering_frequency_days") val wateringFrequencyDays: Int,
    @SerializedName("fertilizing_frequency_days") val fertilizingFrequencyDays: Int,
    @SerializedName("repotting_frequency_months") val repottingFrequencyMonths: Int?,
    @SerializedName("optimal_humidity_min") val optimalHumidityMin: Double?,
    @SerializedName("optimal_humidity_max") val optimalHumidityMax: Double?,
    @SerializedName("optimal_temp_min") val optimalTempMin: Double?,
    @SerializedName("optimal_temp_max") val optimalTempMax: Double?
) {
    override fun toString(): String = "$nameEn / $nameUk"

    fun getLocalizedDescription(isUk: Boolean): String = if (isUk) descriptionUk else descriptionEn
    fun getLocalizedCareTips(isUk: Boolean): String = careTipsUk ?: ""
}