plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.example.homeplant"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.example.homeplant"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {
    // Базові системні бібліотеки із жорстко зафіксованими стабільними версіями
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.activity:activity-ktx:1.9.3")

    // Дизайн та розмітка (беремо з каталогу, вони стабільні)
    implementation(libs.material)
    implementation(libs.androidx.constraintlayout)

    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.google.code.gson:gson:2.10.1")
    implementation("com.squareup.okhttp3:logging-interceptor:4.11.0")
    implementation(libs.androidx.activity)

    // Тестування
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)

    // Примусове блокування автоматичного підняття версій (Constraints)
    constraints {
        implementation("androidx.core:core:1.13.1") {
            because("Version 1.19.0 requires unsupported API 37")
        }
        implementation("androidx.core:core-ktx:1.13.1") {
            because("Version 1.19.0 requires unsupported API 37")
        }
        implementation("androidx.activity:activity:1.9.3") {
            because("New versions require API 36+")
        }
    }
}