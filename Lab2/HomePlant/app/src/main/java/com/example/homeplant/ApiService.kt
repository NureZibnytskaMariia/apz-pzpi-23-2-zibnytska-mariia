package com.example.homeplant

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.*
import okhttp3.ResponseBody

interface ApiService {

    @POST("auth/login/")
    fun login(@Body request: LoginRequest): Call<TokenResponse>

    @POST("auth/register/")
    fun register(@Body request: RegisterRequest): Call<Void>

    @GET("auth/profile/")
    fun getUserProfile(
        @Header("Authorization") token: String
    ): Call<UserProfileModel>

    @GET("auth/statistics/")
    fun getUserStatistics(
        @Header("Authorization") token: String
    ): Call<UserStatisticsModel>

    @POST("auth/logout/")
    fun logoutUser(
        @Header("Authorization") token: String,
        @Body body: Map<String, String>
    ): Call<ResponseBody>

    @GET("plants/")
    fun getUserPlants(@Header("Authorization") token: String): Call<PlantListResponse>

    @POST("plants/")
    fun createPlant(
        @Header("Authorization") token: String,
        @Body plantData: Map<String, Any>
    ): Call<PlantModel>

    @GET("care/today/")
    fun getTodayTasks(
        @Header("Authorization") token: String
    ): Call<List<CareLogModel>>

    @GET("care/overdue/")
    fun getOverdueTasks(
        @Header("Authorization") token: String
    ): Call<List<CareLogModel>>

    @GET("care/by_date/")
    fun getTasksByDate(
        @Header("Authorization") token: String,
        @Query("date") date: String
    ): Call<List<CareLogModel>>

    @POST("care/{id}/complete/")
    fun completeTask(
        @Header("Authorization") token: String,
        @Path("id") taskId: Int,
        @Body notes: Map<String, String> = emptyMap()
    ): Call<Void>

    @POST("care/{id}/skip/")
    fun skipTask(
        @Header("Authorization") token: String,
        @Path("id") taskId: Int
    ): Call<ResponseBody>

    @GET("care/monthly/")
    fun getMonthlyTasks(
        @Header("Authorization") token: String,
        @Query("year") year: Int,
        @Query("month") month: Int
    ): Call<List<CareLogModel>>

    @GET("plant-types/")
    fun getPlantTypes(@Header("Authorization") token: String): Call<PlantTypeResponse>

    @POST("plants/")
    fun createPlant(@Header("Authorization") token: String, @Body body: AddPlantRequest): Call<PlantModel>
}