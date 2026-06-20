import { useNavigate } from 'react-router-dom'
import EditProfileModal from '../../components/profile/EditProfileModal'

export default function EditProfilePage() {
  const navigate = useNavigate()
  return <EditProfileModal open onClose={() => navigate('/athlete/dashboard')} />
}
