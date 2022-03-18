# pip install webdriver-manager
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.ie.service import Service as IEService

from webdriver_manager.firefox import GeckoDriverManager
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from webdriver_manager.microsoft import IEDriverManager


def edge_session():
    service = EdgeService(
        executable_path=EdgeChromiumDriverManager().install())

    driver = webdriver.Edge(service=service)

    return driver
    # driver.quit()


def firefox_session():
    service = FirefoxService(executable_path=GeckoDriverManager().install())

    driver = webdriver.Firefox(service=service)
    return driver
    # driver.quit()


def ie_session():
    service = IEService(executable_path=IEDriverManager().install())

    driver = webdriver.Ie(service=service)
    return driver
    # driver.quit()


def edgeie_session():
    ie_options = webdriver.IeOptions()
    ie_options.attach_to_edge_chrome = True
    ie_options.edge_executable_path = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
    driver = webdriver.Ie(options=ie_options)
    return driver
