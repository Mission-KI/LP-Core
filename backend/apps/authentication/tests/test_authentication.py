from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
import random
import string

class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_login(self):
        url = reverse('token_obtain_pair')
        data = {
            'email': 'test@daseen.de',
            'password': 'Testaccount1_'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)

    def test_registration(self):
        url = reverse('register')
        random_number = ''.join(random.choices(string.digits, k=4))
        email = f'test_user_{random_number}@test.com'
        data = {
            'email': email,
            'password': 'password123',
            'name': 'New User'
        }
        response = self.client.post(url, data, format='json')

        self.assertIn('user', response.data)
        self.assertIn('email', response.data['user'])
        self.assertEqual(response.data['user']['email'], email)
