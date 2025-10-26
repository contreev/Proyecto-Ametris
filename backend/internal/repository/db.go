package repository

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"alquimia-backend/internal/models"
)

var DB *gorm.DB

func ConnectDB() {
	// Cargar archivo .env
	err := godotenv.Load()
	if err != nil {
		log.Println("⚠️ No se pudo cargar .env, se usarán variables del sistema")
	}

	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		host, user, password, dbname, port)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Error conectando a la base de datos:", err)
	}

	// ✅ Migrar modelos automáticamente
	err = db.AutoMigrate(&models.Alquimista{}, &models.Transmutation{})
	if err != nil {
		log.Fatal("❌ Error ejecutando migraciones:", err)
	}

	log.Println("✅ Migraciones ejecutadas correctamente")
	log.Println("✅ Conectado a la base de datos con éxito")
	DB = db
}
