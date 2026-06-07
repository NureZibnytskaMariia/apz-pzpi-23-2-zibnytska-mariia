package com.example.homeplant

import com.google.gson.annotations.SerializedName

data class UserProfileModel(
    @SerializedName("id") val id: Int,
    @SerializedName("email") val email: String,
    @SerializedName("username") val username: String,
    @SerializedName("language") val language: String,
    @SerializedName("is_premium") val isPremium: Boolean,
    @SerializedName("premium_start_date") val premiumStartDate: String?,
    @SerializedName("premium_end_date") val premiumEndDate: String?,
    @SerializedName("is_premium_active") val isPremiumActive: Boolean,
    @SerializedName("plant_limit") val plantLimit: Int?,
    @SerializedName("is_admin") val isAdmin: Boolean
)

data class UserStatisticsModel(
    @SerializedName("total_plants") val totalPlants: Int,
    @SerializedName("plant_limit") val plantLimit: Int?,
    @SerializedName("is_premium") val isPremium: Boolean,
    @SerializedName("premium_days_left") val premiumDaysLeft: Int,
    @SerializedName("completed_tasks") val completedTasks: Int,
    @SerializedName("pending_tasks") val pendingTasks: Int,
    @SerializedName("overdue_tasks") val overdueTasks: Int
)