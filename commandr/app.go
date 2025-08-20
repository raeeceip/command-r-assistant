package main

import (
	"commandr/backend/services"
	"commandr/backend/utils"
	"context"

	"go.uber.org/zap"
)

// App struct
type App struct {
	ctx         context.Context
	chatService *services.ChatService
}

type ChatResponse struct {
	Content string `json:"content"`
}

// NewApp creates a new App application struct
func NewApp(chatService *services.ChatService) *App {
	return &App{
		chatService: chatService,
	}
}

// startup is called when the app starts. The context is saved
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	utils.Logger.Info("App started successfully")
}

// SendMessage sends a message to the chat service and returns a response
func (a *App) SendMessage(message string, temperature float64) (*ChatResponse, error) {
	utils.Logger.Info("SendMessage called",
		zap.String("message", message),
		zap.Float64("temperature", temperature))

	response, err := a.chatService.GenerateResponse(a.ctx, message, temperature)
	if err != nil {
		utils.Logger.Error("Error generating response", zap.Error(err))
		return nil, err
	}

	utils.Logger.Info("Response generated successfully",
		zap.String("response", response.Text))

	return &ChatResponse{
		Content: response.Text,
	}, nil
}

// ClearChat clears the current conversation
func (a *App) ClearChat() error {
	utils.Logger.Info("ClearChat called")
	a.chatService.CreateConversation("New Chat")
	return nil
}
