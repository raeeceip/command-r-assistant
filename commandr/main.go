package main

import (
	"embed"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"go.uber.org/zap"

	"commandr/backend/api"
	"commandr/backend/services"
	"commandr/backend/utils"
)

//go:embed frontend/dist
var assets embed.FS

func main() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: Error loading .env file: %v", err)
	}

	// Initialize logger
	utils.InitLogger()

	// Check if API key is loaded
	apiKey := os.Getenv("COHERE_API_KEY")
	if apiKey == "" {
		log.Fatal("COHERE_API_KEY environment variable is not set")
	}

	utils.Logger.Info("Starting CommandR Assistant",
		zap.String("api_key_length", string(rune(len(apiKey)))))

	// Create Cohere API client
	cohereAPI, err := api.NewCohereAPI(apiKey)
	if err != nil {
		utils.Logger.Fatal("Failed to create Cohere API client", zap.Error(err))
	}

	// Create chat service
	chatService := services.NewChatService(cohereAPI)

	// Create application
	app := NewApp(chatService)

	// Create application with options
	err = wails.Run(&options.App{
		Title:            "CommandR",
		Width:            1024,
		Height:           768,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		utils.Logger.Fatal("Error running application", zap.Error(err))
	}
}
