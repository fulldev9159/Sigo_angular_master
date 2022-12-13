from selenium.webdriver.common.by import By
from selenium import webdriver


def login(driver, etapa):
    search_field = driver.find_element(By.NAME, "username")
    search_field.send_keys("Selenium 4.3.0")
