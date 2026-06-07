package com.example.homeplant

import com.google.gson.annotations.SerializedName

data class LoginRequest(
    val email: String,
    val password: String
)

data class RegisterRequest(
    val email: String,
    val username: String,
    val password: String,
    @SerializedName("password_confirm") val passwordConfirm: String,
    val language: String = "uk"
)

data class TokenResponse(
    val refresh: String,
    val access: String
)