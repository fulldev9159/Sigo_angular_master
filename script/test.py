from selenium.webdriver.common.by import By
from selenium import webdriver
from shutil import which

chromedriver_path = which("chromedriver")

print(chromedriver_path)

# Create a new instance of the Chrome web browser
driver = webdriver.Chrome()

# Open the web page
driver.get("https://www.google.com")

# Find the search input field on the page using the 'name' attribute
search_field = driver.find_element(By.NAME, "q")

# Enter a search query
search_field.send_keys("Selenium 4.3.0")

# Submit the search form
search_field.submit()

# Wait for the results to load
driver.implicitly_wait(10)

# Print the title of the first result
first_result = driver.find_element(By.CSS_SELECTOR, "h3")
print(first_result.text)

# Close the browser
driver.quit()
