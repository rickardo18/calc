# Selenium feature tests for Calculator App
# Requires: pip install selenium
# Also requires ChromeDriver or another driver in PATH

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import os

class CalculatorFeatureTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Adjust path to your local index.html
        html_path = os.path.abspath('index.html')
        cls.url = 'file://' + html_path
        cls.driver = webdriver.Chrome()
        cls.driver.get(cls.url)
        time.sleep(0.5)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def setUp(self):
        # Reload page before each test
        self.driver.get(self.url)
        time.sleep(0.2)

    def click_button(self, label):
        # Find button by text or alt attribute
        btns = self.driver.find_elements(By.CLASS_NAME, 'btn')
        for btn in btns:
            if btn.text.strip() == label:
                btn.click()
                return
            img = btn.find_elements(By.TAG_NAME, 'img')
            if img and img[0].get_attribute('alt') == label:
                btn.click()
                return
        raise Exception(f'Button {label} not found')

    def get_expression(self):
        return self.driver.find_element(By.CSS_SELECTOR, '.display .expression').text

    def get_result(self):
        return self.driver.find_element(By.CSS_SELECTOR, '.display .result').text

    def test_addition(self):
        self.click_button('2')
        self.click_button('+')
        self.click_button('3')
        self.click_button('=')
        self.assertEqual(self.get_result(), '=5')

    def test_multiplication(self):
        self.click_button('4')
        self.click_button('*')
        self.click_button('5')
        self.click_button('=')
        self.assertEqual(self.get_result(), '=20')

    def test_division(self):
        self.click_button('8')
        self.click_button('/')
        self.click_button('2')
        self.click_button('=')
        self.assertEqual(self.get_result(), '=4')

    def test_decimal(self):
        self.click_button('1')
        self.click_button('.')
        self.click_button('5')
        self.click_button('+')
        self.click_button('2')
        self.click_button('.')
        self.click_button('5')
        self.click_button('=')
        self.assertEqual(self.get_result(), '=4')

    def test_clear(self):
        self.click_button('9')
        self.click_button('Ac')
        self.assertEqual(self.get_expression(), '0')
        self.assertEqual(self.get_result(), '')

    def test_delete(self):
        self.click_button('1')
        self.click_button('2')
        self.click_button('3')
        self.click_button('del')
        self.assertEqual(self.get_expression(), '12')

if __name__ == '__main__':
    unittest.main()
