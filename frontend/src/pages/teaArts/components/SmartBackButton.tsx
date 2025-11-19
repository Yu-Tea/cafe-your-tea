import { useSmartNavigation } from '../hooks/useSmartNavigation'
import { FaArrowLeft } from 'react-icons/fa'
import { IoStorefrontSharp } from "react-icons/io5";
import { Button } from "@/shared/components/Button";

export default function SmartBackButton() {
  const { canGoBack, goBack, buttonText } = useSmartNavigation()

  return (
    <Button
    variant="st-btn"
      onClick={goBack}
      className="btn-outline btn-primary px-6"
    >
      {canGoBack ? <FaArrowLeft /> : <IoStorefrontSharp />}
      <span>{buttonText}</span>
    </Button>
  )
}