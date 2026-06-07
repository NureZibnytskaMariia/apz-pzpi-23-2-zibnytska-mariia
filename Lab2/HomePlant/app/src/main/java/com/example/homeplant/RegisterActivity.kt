package com.example.homeplant

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val etRegUsername = findViewById<EditText>(R.id.etRegUsername)
        val etRegEmail = findViewById<EditText>(R.id.etRegEmail)
        val etRegPassword = findViewById<EditText>(R.id.etRegPassword)
        val etRegPasswordConfirm = findViewById<EditText>(R.id.etRegPasswordConfirm)
        val btnDoRegister = findViewById<Button>(R.id.btnDoRegister)

        btnDoRegister.setOnClickListener {
            val username = etRegUsername.text.toString().trim()
            val email = etRegEmail.text.toString().trim()
            val password = etRegPassword.text.toString().trim()
            val passwordConfirm = etRegPasswordConfirm.text.toString().trim()

            if (username.isEmpty() || email.isEmpty() || password.isEmpty() || passwordConfirm.isEmpty()) {
                Toast.makeText(this, "Будь ласка, заповніть всі поля", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (password != passwordConfirm) {
                Toast.makeText(this, "Паролі не збігаються", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (password.length < 8) {
                Toast.makeText(this, "Пароль має бути не менше 8 символів", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val registerRequest = RegisterRequest(
                username = username,
                email = email,
                password = password,
                passwordConfirm = passwordConfirm
            )

            RetrofitClient.instance.register(registerRequest).enqueue(object : Callback<Void> {
                override fun onResponse(call: Call<Void>, response: Response<Void>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@RegisterActivity, "Реєстрація успішна! Увійдіть", Toast.LENGTH_LONG).show()
                        finish()
                    } else {
                        Toast.makeText(this@RegisterActivity, "Помилка реєстрації. Можливо, такий email вже існує", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Void>, t: Throwable) {
                    Toast.makeText(this@RegisterActivity, "Помилка мережі: ${t.message}", Toast.LENGTH_LONG).show()
                }
            })
        }
    }
}