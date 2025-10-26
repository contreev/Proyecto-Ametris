// backend/internal/models/mission.go
package models

import "time"

type MissionStatus string

const (
	MissionOpen       MissionStatus = "open"
	MissionClosed     MissionStatus = "closed"
	MissionInProgress MissionStatus = "in_progress"
)

type Mission struct {
	ID            uint          `gorm:"primaryKey" json:"id"`
	Titulo        string        `json:"titulo"`
	Descripcion   string        `json:"descripcion"`
	SolicitanteID uint          `json:"solicitante_id"`
	Solicitante   User          `gorm:"foreignKey:SolicitanteID"`
	Status        MissionStatus `json:"status"`
	CreatedAt     time.Time     `json:"created_at"`
	UpdatedAt     time.Time     `json:"updated_at"`
}
