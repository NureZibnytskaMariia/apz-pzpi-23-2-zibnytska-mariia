package com.example.homeplant

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    private lateinit var tokenManager: TokenManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        tokenManager = TokenManager(this)

        if (tokenManager.getAccessToken() != null) {
            navigateToHome()
            return
        }

        val etEmail = findViewById<EditText>(R.id.etEmail)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val btnRegister = findViewById<Button>(R.id.btnRegister)

        btnLogin.setOnClickListener {
            val email = etEmail.text.toString().trim()
            val password = etPassword.text.toString().trim()

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Будь ласка, заповніть всі поля", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val loginRequest = LoginRequest(email = email, password = password)

            RetrofitClient.instance.login(loginRequest).enqueue(object : Callback<TokenResponse> {
                override fun onResponse(call: Call<TokenResponse>, response: Response<TokenResponse>) {
                    if (response.isSuccessful && response.body() != null) {
                        val tokens = response.body()!!

                        tokenManager.saveTokens(tokens.access, tokens.refresh)

                        Toast.makeText(this@MainActivity, "Вхід успішний!", Toast.LENGTH_SHORT).show()
                        navigateToHome()
                    } else {
                        Toast.makeText(this@MainActivity, "Невірний email або пароль", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<TokenResponse>, t: Throwable) {
                    Toast.makeText(this@MainActivity, "Помилка підключення: ${t.message}", android.widget.Toast.LENGTH_LONG).show()
                }
            })
        }

        btnRegister.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
    }

    private fun navigateToHome() {
        val intent = Intent(this, HomeActivity::class.java)
        startActivity(intent)
        finish()
    }
}