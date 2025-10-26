package main

import (
	"fmt"
	"log"
	"net/http"

	"alquimia-backend/internal/handlers"
	"alquimia-backend/internal/models"
	"alquimia-backend/internal/repository"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// Conectar a la base de datos
	repository.ConnectDB()

	// Migrar modelos
	repository.DB.AutoMigrate(&models.Alquimista{}, &models.Transmutation{})

	// Configurar el router
	r := mux.NewRouter()

	// Rutas de transmutaciones
	r.HandleFunc("/transmutaciones", handlers.GetTransmutaciones).Methods("GET")
	r.HandleFunc("/transmutaciones", handlers.CreateTransmutation).Methods("POST")

	// Rutas de alquimistas
	r.HandleFunc("/alquimistas", handlers.GetAlquimistas).Methods("GET")
	r.HandleFunc("/alquimistas", handlers.CreateAlquimista).Methods("POST")

	// Ruta de health check
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	}).Methods("GET")

	// Middleware CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://localhost"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	// Iniciar servidor
	fmt.Println("🚀 Servidor escuchando en :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
