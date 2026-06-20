import { AlertTriangle } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Eliminar', onConfirm, onClose }) {
  if (!open) return null

  return (
    <Modal open={open} onClose={onClose} title={title} variant="modal" maxWidth="max-w-sm">
      <div className="flex flex-col items-center text-center gap-3 mb-2">
        <span className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </span>
        <p className="text-sm text-ink-soft">{message}</p>
      </div>
      <div className="flex gap-3 mt-5">
        <Button variant="outlineInk" className="flex-1" onClick={onClose}>Cancelar</Button>
        <Button
          variant="danger"
          className="flex-1"
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
