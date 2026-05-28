import UIKit
import Capacitor
import WebKit
import GoogleSignIn

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Configure Google Sign-In
        GIDSignIn.sharedInstance.configuration = GIDConfiguration(
            clientID: "515991232927-olc8ph973obek3fssl2se7ed165ao314.apps.googleusercontent.com"
        )
        // Fond bleu synchrone — évite tout flash blanc avant le splash
        let jagoBlue = UIColor(red: 0.039, green: 0.141, blue: 0.388, alpha: 1.0)
        window?.backgroundColor = jagoBlue
        UIApplication.shared.windows.first?.backgroundColor = jagoBlue
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            self.disableHorizontalSwipe()
        }
        return true
    }

    private func disableHorizontalSwipe() {
        guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
              let window = windowScene.windows.first else { return }
        self.findAndFixWebViews(in: window)
    }

    private func findAndFixWebViews(in view: UIView) {
        let typeName = String(describing: type(of: view))
        if typeName.contains("WKWebView") {
            if let webView = view as? WKWebView {
                webView.allowsBackForwardNavigationGestures = false
                webView.scrollView.bounces = false
                webView.scrollView.alwaysBounceHorizontal = false
                webView.scrollView.showsHorizontalScrollIndicator = false
            }
        }
        for subview in view.subviews {
            findAndFixWebViews(in: subview)
        }
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        if GIDSignIn.sharedInstance.handle(url) {
            return true
        }
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return true
    }

    // ── Push Notifications — forward APNs token to Capacitor ──
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    }

}
