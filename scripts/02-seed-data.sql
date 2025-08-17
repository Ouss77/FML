-- Seed data for testing the medical replacement platform

-- Insert test users
INSERT INTO users (id, email, password_hash, user_type, first_name, last_name, phone, email_verified) VALUES
-- Replacement doctors
('550e8400-e29b-41d4-a716-446655440001', 'dr.martin@example.com', '$2b$10$hash1', 'replacement', 'Pierre', 'Martin', '+33123456789', true),
('550e8400-e29b-41d4-a716-446655440002', 'dr.dubois@example.com', '$2b$10$hash2', 'replacement', 'Marie', 'Dubois', '+33123456790', true),
('550e8400-e29b-41d4-a716-446655440003', 'dr.bernard@example.com', '$2b$10$hash3', 'replacement', 'Jean', 'Bernard', '+33123456791', true),

-- Employers
('550e8400-e29b-41d4-a716-446655440004', 'contact@hopital-paris.fr', '$2b$10$hash4', 'employer', 'Sophie', 'Leroy', '+33123456792', true),
('550e8400-e29b-41d4-a716-446655440005', 'rh@clinique-lyon.fr', '$2b$10$hash5', 'employer', 'Michel', 'Rousseau', '+33123456793', true),

-- Admin
('550e8400-e29b-41d4-a716-446655440006', 'admin@medreplace.com', '$2b$10$hash6', 'admin', 'Admin', 'System', '+33123456794', true)
ON CONFLICT (email) DO NOTHING;

-- Insert replacement profiles
INSERT INTO replacement_profiles (user_id, rpps_number, specialty, location, experience_years, diploma, languages, hourly_rate, daily_rate, bio, availability_start, availability_end, profile_status) VALUES
('550e8400-e29b-41d4-a716-446655440001', '10001234567', 'Médecine générale', 'Paris, France', 8, 'Doctorat en Médecine - Université Paris Descartes', ARRAY['Français', 'Anglais'], 65.00, 520.00, 'Médecin généraliste expérimenté, spécialisé dans la médecine familiale et les urgences.', '2024-01-15', '2024-12-31', 'approved'),
('550e8400-e29b-41d4-a716-446655440002', '10001234568', 'Cardiologie', 'Lyon, France', 12, 'Doctorat en Médecine + DES Cardiologie - Université Claude Bernard', ARRAY['Français', 'Anglais', 'Espagnol'], 85.00, 680.00, 'Cardiologue interventionnelle avec expertise en cathétérisme cardiaque.', '2024-02-01', '2024-11-30', 'approved'),
('550e8400-e29b-41d4-a716-446655440003', '10001234569', 'Pédiatrie', 'Marseille, France', 6, 'Doctorat en Médecine + DES Pédiatrie - Université Aix-Marseille', ARRAY['Français', 'Italien'], 70.00, 560.00, 'Pédiatre passionné par la santé infantile et les soins préventifs.', '2024-01-01', '2024-12-31', 'pending');

-- Insert employer profiles
INSERT INTO employer_profiles (user_id, organization_name, organization_type, siret_number, address, city, postal_code, contact_person, description, profile_status) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'Hôpital Saint-Louis', 'hospital', '12345678901234', '1 Avenue Claude Vellefaux', 'Paris', '75010', 'Sophie Leroy', 'Hôpital universitaire de référence spécialisé en hématologie et dermatologie.', 'approved'),
('550e8400-e29b-41d4-a716-446655440005', 'Clinique du Parc', 'clinic', '12345678901235', '155 Ter Boulevard Stalingrad', 'Lyon', '69006', 'Michel Rousseau', 'Clinique privée moderne offrant des soins de qualité en chirurgie et médecine.', 'approved');

-- Insert sample missions
INSERT INTO missions (id, employer_id, title, description, specialty_required, location, start_date, end_date, hourly_rate, daily_rate, requirements, mission_type, status, is_urgent) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 'Remplacement Médecin Généraliste - Urgences', 'Recherche médecin généraliste pour remplacement aux urgences pendant les vacances d''été.', 'Médecine générale', 'Paris, France', '2024-07-15', '2024-08-15', 70.00, 560.00, 'Expérience en médecine d''urgence souhaitée, disponibilité week-ends', 'vacation', 'open', false),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 'Cardiologue - Remplacement Urgent', 'Remplacement urgent d''un cardiologue pour consultations et examens.', 'Cardiologie', 'Lyon, France', '2024-03-01', '2024-03-31', 90.00, 720.00, 'Habilitation échographie cardiaque requise', 'emergency', 'open', true),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 'Pédiatre - Service Néonatologie', 'Remplacement en service de néonatologie pour congé maternité.', 'Pédiatrie', 'Paris, France', '2024-04-01', '2024-07-01', 75.00, 600.00, 'Expérience en néonatologie indispensable', 'replacement', 'open', false);

-- Insert sample experiences
INSERT INTO experiences (replacement_id, workplace_name, workplace_type, location, start_date, end_date, duration_months, specialty, description, reference_contact, reference_phone, reference_email) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Hôpital Cochin', 'hospital', 'Paris, France', '2020-01-01', '2023-12-31', 48, 'Médecine générale', 'Médecin aux urgences et consultations externes', 'Dr. Sylvie Moreau', '+33145678901', 'sylvie.moreau@cochin.fr'),
('550e8400-e29b-41d4-a716-446655440002', 'Institut de Cardiologie', 'clinic', 'Lyon, France', '2018-06-01', '2023-05-31', 60, 'Cardiologie', 'Cardiologie interventionnelle et consultations', 'Pr. Antoine Dubois', '+33478901234', 'antoine.dubois@cardio-lyon.fr'),
('550e8400-e29b-41d4-a716-446655440003', 'CHU Timone', 'hospital', 'Marseille, France', '2021-09-01', '2024-01-31', 28, 'Pédiatrie', 'Service de pédiatrie générale et urgences pédiatriques', 'Dr. Isabelle Blanc', '+33491234567', 'isabelle.blanc@timone.fr');

-- Insert sample applications
INSERT INTO applications (mission_id, replacement_id, cover_letter, proposed_rate, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Je suis très intéressé par cette mission de remplacement aux urgences. Mon expérience à l''hôpital Cochin m''a permis de développer une solide expertise en médecine d''urgence.', 65.00, 'pending'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Ma spécialisation en cardiologie interventionnelle et mon expérience à l''Institut de Cardiologie de Lyon font de moi le candidat idéal pour ce remplacement urgent.', 85.00, 'accepted');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, notification_type, related_id) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Nouvelle mission disponible', 'Une nouvelle mission en médecine générale est disponible à Paris.', 'new_mission', '660e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440004', 'Nouvelle candidature', 'Dr. Martin a postulé pour votre mission aux urgences.', 'new_application', '660e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440002', 'Candidature acceptée', 'Votre candidature pour la mission de cardiologie à Lyon a été acceptée.', 'application_accepted', '660e8400-e29b-41d4-a716-446655440002');
