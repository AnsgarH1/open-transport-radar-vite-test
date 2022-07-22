import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'Vorname zu kurz!')
      .max(50, 'VorName zu lang!')
      .required('Vorname wird benötigt'),
    lastname: Yup.string()
      .min(2, 'Nachname zu kurz!')
      .max(50, 'Nachname zu lang!')
      .required('Nachname wird benötigt'),
    email: Yup.string()
      .email('Ungültige email')
      .required('E-Mail wird benötigt'),
    issue: Yup.string()
      .ensure()
      .required("Bitte gebe einen Grund an"),
    text: Yup.string()
      .min(2, 'Bitte mindestens 2 Zeichen verwenden.')
      .max(500, 'Bitte maximal 500 Zeichen verwenden.')
      .required('Bitte schreibe hier dein Feedback'),
  });