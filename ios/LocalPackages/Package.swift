// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "LocalCapacitorPlugins",
    platforms: [.iOS(.v15)],
    products: [
        .library(name: "CapacitorPushNotifications", targets: ["PushNotificationsPlugin"]),
        .library(name: "CapacitorCommunityAppleSignIn", targets: ["SignInWithApple"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", exact: "8.3.1")
    ],
    targets: [
        .target(
            name: "PushNotificationsPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/PushNotificationsPlugin"),
        .target(
            name: "SignInWithApple",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/SignInWithApple")
    ]
)
