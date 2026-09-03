<?php
// Secure contact form handler with input validation and anti-spam measures

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Validate email
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
if (!$email) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Adresse email invalide']);
    exit;
}

// Check for required fields
$name = preg_replace('/[\r\n]+/', ' ', sanitize_input($_POST['name'] ?? ''));
$message = sanitize_input($_POST['message'] ?? '');

if (empty($name) || empty($message)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Tous les champs sont requis']);
    exit;
}

// Basic anti-spam: check for suspicious content
$suspicious_patterns = ['http://', 'https://', '<script', 'viagra', 'casino'];
$combined_content = strtolower($name . ' ' . $message);
foreach ($suspicious_patterns as $pattern) {
    if (strpos($combined_content, $pattern) !== false) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Contenu suspect détecté']);
        exit;
    }
}

// Rate limiting (simple session-based)
session_start();
$last_submit = $_SESSION['last_contact_submit'] ?? 0;
if (time() - $last_submit < 60) { // 1 minute cooldown
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Trop de soumissions. Veuillez attendre.']);
    exit;
}
$_SESSION['last_contact_submit'] = time();

// Prepare email
$to = 'contact@noriade.com';
$subject = 'Nouveau message depuis le site web: ' . substr($name, 0, 50);
$body = "Nom: $name\n\nEmail: $email\n\nMessage:\n$message\n\n--\nEnvoyé depuis noriade.com";

$headers = [
    'From' => 'noreply@noriade.com',
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
];

// Use mail() with safer headers
$header_string = '';
foreach ($headers as $key => $value) {
    $header_string .= $key . ': ' . $value . "\r\n";
}

if (mail($to, $subject, $body, $header_string)) {
    echo json_encode(['status' => 'success', 'message' => 'Message envoyé avec succès']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erreur lors de l\'envoi du message']);
}
?>
