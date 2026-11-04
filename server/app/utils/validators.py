import re
from typing import List, Dict, Any, Tuple, Optional

EMAIL_REGEX = re.compile(r"^[\w\.-]+@([\w-]+\.)+[\w-]{2,63}$")


def is_valid_email(email: Optional[str]) -> bool:
    if not email or not isinstance(email, str):
        return False
    return bool(EMAIL_REGEX.match(email.strip()))


def validate_required_fields(data: Optional[Dict[str, Any]], required_fields: List[str]) -> Tuple[bool, Optional[str]]:
    if not data or not isinstance(data, dict):
        return False, "Request body must be a valid JSON object"
    
    missing = [f for f in required_fields if f not in data or data[f] is None or (isinstance(data[f], str) and not data[f].strip())]
    if missing:
        return False, f"Missing required fields: {', '.join(missing)}"
    
    return True, None
